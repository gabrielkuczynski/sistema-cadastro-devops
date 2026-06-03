variable "aws_region" {
  description = "Região AWS para provisionar os recursos"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Tipo da instância EC2"
  type        = string
  default     = "t3.micro"
}

variable "projeto" {
  description = "Nome do projeto (usado como prefixo nos recursos)"
  type        = string
  default     = "sistema-cadastro"
}

variable "ambiente" {
  description = "Ambiente de deploy (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "db_password" {
  description = "Senha do banco de dados PostgreSQL"
  type        = string
  sensitive   = true
}

variable "key_name" {
  description = "Nome do par de chaves SSH para acesso à EC2"
  type        = string
  default     = ""
}
