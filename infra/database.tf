resource "aws_db_subnet_group" "main" {
  name       = "${var.projeto}-db-subnet-group"
  subnet_ids = [aws_subnet.private.id, aws_subnet.public.id]

  tags = { Name = "${var.projeto}-db-subnet-group" }
}

resource "aws_db_instance" "postgres" {
  identifier        = "${var.projeto}-db"
  engine            = "postgres"
  engine_version    = "14"
  instance_class    = "db.t3.micro"
  allocated_storage = 20

  db_name  = "scu_db"
  username = "postgres"
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]

  backup_retention_period = 7
  skip_final_snapshot     = true
  publicly_accessible     = false

  tags = { Name = "${var.projeto}-postgres", Ambiente = var.ambiente }
}
