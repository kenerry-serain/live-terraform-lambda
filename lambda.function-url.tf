resource "aws_lambda_function_url" "latest" {
  function_name      = aws_lambda_function.lambda.function_name
  authorization_type = "NONE"
}