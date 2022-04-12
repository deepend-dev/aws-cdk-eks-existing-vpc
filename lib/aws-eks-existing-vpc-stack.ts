import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AwsEksExistingVpcStack extends Stack {

	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const eks_cluster_name: string = process.env.EKS_CLUSTER_NAME ?? 'deep-default-eks';
		const vpc_name: string = process.env.VPC_NAME ?? 'DefaultVPC';

		const vpc = ec2.Vpc.fromLookup(this, vpc_name, { isDefault: true });
		const role = iam.Role.fromRoleName(this, "AdminRole", "Admin");

		new eks.Cluster(this, eks_cluster_name, {
			version: eks.KubernetesVersion.V1_21,
			vpc,
			vpcSubnets: [{ subnetType: ec2.SubnetType.PUBLIC }],
			defaultCapacity: 2,
			defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.M6G, ec2.InstanceSize.LARGE),
			albController: {
				version: eks.AlbControllerVersion.V2_3_1,
			},
			mastersRole: role,
		  });
	}
}
