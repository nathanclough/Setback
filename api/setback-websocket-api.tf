output "api_endpoint" {
    value = aws_apigatewayv2_api.setback_api_gateway.api_endpoint
}

resource "aws_apigatewayv2_api" "setback_api_gateway" {
  name                       = "setback-websocket-api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "request.body.action"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.setback_api_gateway.id
  name        = "prod"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.setback_api_gateway.arn
    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_cloudwatch_log_group" "setback_api_gateway" {
  name              = "/aws/api_gw/${aws_apigatewayv2_api.setback_api_gateway.name}"
  retention_in_days = 30
}

# $default Route
resource "aws_apigatewayv2_integration" "default" {
  api_id             = aws_apigatewayv2_api.setback_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = module.onDefault.invoke_arn
}

resource "aws_apigatewayv2_integration_response" "default" {
  api_id                   = aws_apigatewayv2_api.setback_api_gateway.id
  integration_id           = aws_apigatewayv2_integration.default.id
  integration_response_key = "/200/"

}

resource "aws_apigatewayv2_route" "default" {
  api_id                              = aws_apigatewayv2_api.setback_api_gateway.id
  route_key                           = "$default"
  target                              = "integrations/${aws_apigatewayv2_integration.default.id}"
  route_response_selection_expression = "$default"
}

resource "aws_apigatewayv2_route_response" "default" {
  api_id             = aws_apigatewayv2_api.setback_api_gateway.id
  route_id           = aws_apigatewayv2_route.default.id
  route_response_key = "$default"
}

# $connect Route 
resource "aws_apigatewayv2_integration" "connect" {
  api_id             = aws_apigatewayv2_api.setback_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = module.onConnect.invoke_arn
}

resource "aws_apigatewayv2_integration_response" "connect" {
  api_id                   = aws_apigatewayv2_api.setback_api_gateway.id
  integration_id           = aws_apigatewayv2_integration.connect.id
  integration_response_key = "/200/"

}

resource "aws_apigatewayv2_route" "connect" {
  api_id                              = aws_apigatewayv2_api.setback_api_gateway.id
  route_key                           = "$connect"
  target                              = "integrations/${aws_apigatewayv2_integration.connect.id}"
}

# $disconnect Route
resource "aws_apigatewayv2_integration" "disconnect" {
  api_id             = aws_apigatewayv2_api.setback_api_gateway.id
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  integration_uri    = module.onDisconnect.invoke_arn
}

resource "aws_apigatewayv2_integration_response" "disconnect" {
  api_id                   = aws_apigatewayv2_api.setback_api_gateway.id
  integration_id           = aws_apigatewayv2_integration.disconnect.id
  integration_response_key = "/200/"
}

resource "aws_apigatewayv2_route" "disconnect" {
  api_id                              = aws_apigatewayv2_api.setback_api_gateway.id
  route_key                           = "$disconnect"
  target                              = "integrations/${aws_apigatewayv2_integration.disconnect.id}"
}
