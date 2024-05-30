data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/build"
  output_path = "${path.module}/lambda/output/package.zip"
}

resource "aws_lambda_function" "lambda" {
  filename         = "${path.module}/lambda/output/package.zip"
  function_name    = "get-s3-object-function"
  role             = aws_iam_role.iam_for_lambda.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "nodejs18.x"
}