data "archive_file" "layer_source" {
  type        = "zip"
  source_dir  = "${path.root}/CommonLayer/dist"
  output_path = "${path.root}/CommonLayer/CommonLayer.zip"
}

resource "aws_lambda_layer_version" "common_layer" {
  filename   =  data.archive_file.layer_source.output_path
  layer_name = "SetbackCommonLayer"
  compatible_runtimes = ["nodejs16.x"]
}