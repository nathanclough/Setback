data "archive_file" "source" {
  type = "zip"
  source_dir = "${path.module}/setback-event-handler/dist"
  output_path = "${path.module}/setback-event-handler.zip"
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "setback-bucket"
  }

resource "aws_s3_object" "setback-event-handler" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "setback-event-handler.zip"
  source = data.archive_file.source.output_path

  etag = filemd5(data.archive_file.source.output_path)
}

resource "aws_lambda_function" "setback-event-handler" {
  function_name = "setback-event-handler"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.setback-event-handler.key

  runtime = "nodejs16.x"
  handler = "app.lambdaHandler"

  source_code_hash = data.archive_file.source.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "setback-event-handler" {
  name = "/aws/lambda/${aws_lambda_function.setback-event-handler.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

