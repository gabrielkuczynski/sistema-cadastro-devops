terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.aws_region
}

# ── EC2 (Back-end Node.js) ────────────────────────────────────────────────────
resource "aws_instance" "backend" {
  ami                    = "ami-0c101f26f147fa7fd" # Amazon Linux 2023 (us-east-1)
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.backend_sg.id]
  key_name               = var.key_name

  user_data = <<-EOF
    #!/bin/bash
    yum update -y
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
    yum install -y nodejs
    npm install -g pm2
  EOF

  tags = {
    Name        = "scu-backend"
    Projeto     = "sistema-cadastro"
    Ambiente    = var.ambiente
  }
}

# ── S3 (Artefatos do front-end) ───────────────────────────────────────────────
resource "aws_s3_bucket" "frontend" {
  bucket = "${var.projeto}-frontend-${var.ambiente}"

  tags = {
    Nome     = "scu-frontend"
    Projeto  = var.projeto
    Ambiente = var.ambiente
  }
}

resource "aws_s3_bucket_versioning" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  versioning_configuration {
    status = "Enabled"
  }
}
