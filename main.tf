terraform{
	required_providers{

		aws = {
			source = "hashicorp/aws"
			version = "~> 4.16.0"
		}
		archive = {
			source = "hashicorp/archive" 
			version = "~> 2.2.0"
		}
	}
	
}

provider "aws" {
	region = var.aws_region
}

module "api"{
  source = "./api"
}
