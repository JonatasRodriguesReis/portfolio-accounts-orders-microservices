## eks:DescribeCluster

## Try installing whole SSH package pack:

### sudo apt-get install ssh

### aws eks –region $(terraform output -raw region) update-kubeconfig –name $(terraform output -raw cluster_name)

aws eks --region us-east-1 update-kubeconfig --name EKS-Cluster

`
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install my-release bitnami/mysql

Services:

echo Primary: database-mysql.default.svc.cluster.local:3306

Execute the following to get the administrator credentials:

echo Username: root
MYSQL_ROOT_PASSWORD=$(kubectl get secret --namespace default database-mysql -o jsonpath="{.data.mysql-root-password}" | base64 -d)

1. Run a pod that you can use as a client:

   kubectl run database-mysql-client --rm --tty -i --restart='Never' --image docker.io/bitnami/mysql:8.0.30-debian-11-r6 --namespace default --env MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD --command -- bash

2. To connect to primary service (read/write):

   mysql -h database-mysql.default.svc.cluster.local -uroot -p"$MYSQL_ROOT_PASSWORD"
   mysql -h database-mysql.default.svc.cluster.local -uroot -p"huJAZinHiy"

   huJAZinHiy

CREATE DATABASE gateway;
CREATE DATABASE backend;
CREATE TABLE transactions(
id varchar(255) NOT NULL,
account_id varchar(255) NOT NULL,
amount double NOT NULL,
status varchar(255) NOT NULL,
error_message varchar(255) NOT NULL,
created_at datetime NOT NULL,
updated_at datetime NOT NULL
);
`

echo "somestring" | base64 -d
echo "somestring" | base64

{
"id": "1111", "amount": 30.30, "credit_card_number": "5290686979782715", "credit_card_name": "jonatas r reis", "credit_card_expiration_month": 12, "credit_card_expiration_year": 2022, "credit_card_expiration_cvv": "123", "account_id": "2222"
}
