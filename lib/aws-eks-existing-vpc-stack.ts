import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';

export class AwsEksExistingVpcStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);
		const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', { isDefault: true });

		new eks.Cluster(this, 'HelloEKS', {
			version: eks.KubernetesVersion.V1_21,
			vpc,
			vpcSubnets: [{ subnetType: ec2.SubnetType.PRIVATE_WITH_NAT }],
			defaultCapacity: 2,
			defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.M6G, ec2.InstanceSize.SMALL),
			albController: {
				version: eks.AlbControllerVersion.V2_3_1,
			},


		  });
	}
}
