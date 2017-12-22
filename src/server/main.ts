import { serverBuilder } from 'rxjs-grpc';
import { Observable } from 'rxjs/Rx';
import { helloworld } from '../../proto-gen/grpc-namespaces';
import { server_port } from '../config';


const main = async () => {
    const server = serverBuilder<helloworld.ServerBuilder>('helloworld.proto', 'helloworld');
    server.addGreeter({
        sayHello(request: helloworld.HelloRequest): Observable<helloworld.HelloReply> {
            console.log(`Received request from ${request.name}`);
            return Observable.of({
                message: `Hi ${request.name}`
            });
        },
        sayMultiHello(request: helloworld.MultiHelloRequest): Observable<helloworld.HelloReply> {
            return Observable.timer(100, 500)
                .mapTo({
                    message: `Hi ${request.name}`
                }).take(request.num_greetings || 1);
        }
    });

    server.start(`0.0.0.0:${server_port}`);
    console.log(`Server started on port ${server_port}`);
};

main().catch(error => console.error(`[Server] ${error.message}`));