import { clientFactory } from 'rxjs-grpc';
import { helloworld } from '../../proto-gen/grpc-namespaces';
import { server_port } from '../config';


const main = async () => {
    const client = clientFactory<helloworld.ClientFactory>('helloworld.proto', 'helloworld');
    const services = new client(`localhost:${server_port}`);

    services.getGreeter().sayHello({
        name: 'Amir'
    }).subscribe(reply => {
        console.log(`Server responded: ${reply.message}`);
    });

    let count = 0;
    services.getGreeter().sayMultiHello({
        num_greetings: 5,
        name: 'Amir-Multi'
    }).subscribe(reply => {
        console.log(`Server responded [${++count}]: ${reply.message}`);
    });
};


main().catch(error => console.error(`[Client] ${error.message}`));