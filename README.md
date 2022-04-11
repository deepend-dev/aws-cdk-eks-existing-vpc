# AWS EKS STACK - DEPLOY IN EXISTING VPC

## Overview

Code in this repository can be used to deploy EKS in an existing VPC PUBLIC SUBNET with ALB controller installed.
This also deploy 2 default managed node of type `m6g.small`.

Change below subnet to private to deploy into private subnet with NAT `ec2.SubnetType.PRIVATE_WITH_NAT`.

```ts
new eks.Cluster(this, eks_cluster_name, {
   version: eks.KubernetesVersion.V1_21,
   vpc,
   vpcSubnets: [{ subnetType: ec2.SubnetType.PUBLIC }],
   defaultCapacity: 2,
   defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.M6G, ec2.InstanceSize.SMALL),
   albController: {
    version: eks.AlbControllerVersion.V2_3_1,
   },
    });
```

Update `.env` file with required values.

## Run below commands to deploy stack

```sh
aws configure

npm i

cdk synth
cdk deploy
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
