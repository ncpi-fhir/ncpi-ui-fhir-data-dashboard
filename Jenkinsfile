@Library(value='kids-first/aws-infra-jenkins-shared-libraries', changelog=false) _
ecs_service_existing_alb {
    projectName                = "ncpi-ui-fhir-data-dashboard"
    path_pattern              = "/dashboard*"
    deploy_scripts_version     = "master"
    host_based_routing         = "0"
    alb_name                   = "ncpi-api-fhir-service"
    orgFullName                = "ncpi-fhir"
    account                    = "chopd3b"
    environments               = "dev,qa,prd"
    build_environments         = "dev,qa,prd"
    docker_image_type          = "debian"
    create_default_iam_role    = "1"
    entrypoint_command         = "/start_up.sh"
    quick_deploy               = "true"
    container_port             = "80"
    health_check_path          = "/dashboard/"
    external_config_repo       = "false"
    internal_app               = "false"
    dev_cidr                   = "0.0.0.0/0"
    qa_cidr		       = "0.0.0.0/0"
    dependencies               = "ecr"
}
