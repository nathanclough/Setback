// inputs: filepath, bucket 
variable "name" {}
variable "bucket" {}
variable "apigateway_execution_arn" {}
variable "lambda_exec_role_name" {}
variable "lambda_exec_role_arn" {}

output "function_name" {
    value = aws_lambda_function.lambda.function_name
}
output "invoke_arn" {
    value = aws_lambda_function.lambda.invoke_arn
}

resource "aws_s3_object" "lambda" {
  bucket = var.bucket.id

  key    = "${var.name}.zip"
  source = data.archive_file.source.output_path

  etag = filemd5(data.archive_file.source.output_path)
}

data "archive_file" "source" {
  type        = "zip"
  source_dir  = "${path.root}/api/${var.name}/dist"
  output_path = "${path.root}/api/${var.name}.zip"
}


resource "aws_lambda_function" "lambda" {
  function_name = var.name

  s3_bucket = var.bucket.id
  s3_key    = aws_s3_object.lambda.key

  runtime = "nodejs16.x"
  handler = "app.lambdaHandler"

  source_code_hash = data.archive_file.source.output_base64sha256

  role = var.lambda_exec_role_arn
  layers = [aws_lambda_layer_version.common_layer.arn]
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = var.lambda_exec_role_name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.apigateway_execution_arn}/*/*"
}

