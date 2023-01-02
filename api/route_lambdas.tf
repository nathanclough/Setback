locals{
  lambda_env_vars = {
    EVENTS_TABLE = aws_dynamodb_table.setback_events_table.name
  }
}
// Role for executeing the lambda 
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

// Dynamo db role 
resource "aws_iam_role_policy" "dynamodb_lambda_policy"{
  name = "dynamodb_lambda_policy"
  role = aws_iam_role.lambda_exec.id
  policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
           "Effect" : "Allow",
           "Action" : ["dynamodb:*"],
           "Resource" : "${aws_dynamodb_table.setback_events_table.arn}"
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
  env_vars = local.lambda_env_vars
}

module "onDisconnect" {
  source = "./modules/lambda"
  name   = "onDisconnect"
  apigateway_execution_arn = aws_apigatewayv2_api.setback_api_gateway.execution_arn
  bucket = aws_s3_bucket.lambda_bucket
  lambda_exec_role_name = aws_iam_role.lambda_exec.name
  lambda_exec_role_arn = aws_iam_role.lambda_exec.arn
  env_vars = local.lambda_env_vars
}

module "onDefault" {
  source = "./modules/lambda"
  name   = "onDefault"
  apigateway_execution_arn = aws_apigatewayv2_api.setback_api_gateway.execution_arn
  bucket = aws_s3_bucket.lambda_bucket
  lambda_exec_role_name = aws_iam_role.lambda_exec.name
  lambda_exec_role_arn = aws_iam_role.lambda_exec.arn
  env_vars = local.lambda_env_vars
}