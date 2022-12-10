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

module "onConnect" {
  source = "./modules/lambda"
  name   = "onConnect"
  apigateway_execution_arn = aws_apigatewayv2_api.setback_api_gateway.execution_arn
  bucket = aws_s3_bucket.lambda_bucket
  lambda_exec_role_name = aws_iam_role.lambda_exec.name
  lambda_exec_role_arn = aws_iam_role.lambda_exec.arn
}

module "onDisconnect" {
  source = "./modules/lambda"
  name   = "onDisconnect"
  apigateway_execution_arn = aws_apigatewayv2_api.setback_api_gateway.execution_arn
  bucket = aws_s3_bucket.lambda_bucket
  lambda_exec_role_name = aws_iam_role.lambda_exec.name
  lambda_exec_role_arn = aws_iam_role.lambda_exec.arn
}

module "onDefault" {
  source = "./modules/lambda"
  name   = "onDefault"
  apigateway_execution_arn = aws_apigatewayv2_api.setback_api_gateway.execution_arn
  bucket = aws_s3_bucket.lambda_bucket
  lambda_exec_role_name = aws_iam_role.lambda_exec.name
  lambda_exec_role_arn = aws_iam_role.lambda_exec.arn
}