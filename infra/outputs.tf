output "ec2_public_ip" {
  description = "IP público da instância EC2 (back-end)"
  value       = aws_instance.backend.public_ip
}

output "rds_endpoint" {
  description = "Endpoint do banco de dados RDS PostgreSQL"
  value       = aws_db_instance.postgres.endpoint
}

output "s3_bucket_name" {
  description = "Nome do bucket S3 para artefatos do front-end"
  value       = aws_s3_bucket.frontend.bucket
}

output "vpc_id" {
  description = "ID da VPC criada"
  value       = aws_vpc.main.id
}
