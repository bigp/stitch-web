///////////////////////////////////////////////////////////

export default function test() {
    console.groupEnd();
    trace( "scratch file: test" );

    // const trigger1 = {}, trigger2 = {};
    // const time = $$$.now();
    // const toSecs = value => (value/1000).toFixed(3) + 's';

    // Swear(trigger1)
    //     .then(() => trace('Hello Swear!', toSecs($$$.now() - time) ))
    //     .then(() => {
    //         [1,2,3,4,5].forEach(num => {
    //             trace(num);
    //             if(num===4) Swear.continue(num);
    //         });

    //         return 123;
    //     })
    //     .then(lastValue => {
    //         trace("Last value: " + lastValue);

    //         Swear.break('important break!');

    //         return 456;
    //     })
    //     .break(reason => trace.WARN("We broke because of:", reason))
    //     .then(value => trace("Should be: 456 == " + value))
    //     .exec();

    // Swear(trigger2)
    //     .then(() => trace('Hello Swear2!', toSecs($$$.now() - time) ))
    //     .then(() => {
    //         [1,2,3,4,5].forEach(num => {
    //             trace(num);
    //             if(num===4) Swear.continue(num);
    //         });

    //         return 123;
    //     })
    //     .then(lastValue => {
    //         trace("Last value2: " + lastValue);

    //         Swear.break('important break2!');

    //         return 456;
    //     })
    //     .break(reason => trace.WARN("We broke because of2:", reason))
    //     .then(value => trace("Should be 2: 456 == " + value))
    //     .exec();

    // setTimeout(() => trigger1.resolve(), 1000);
    // setTimeout(() => trigger2.resolve(), 1000);
}

    ///////////////////////////////////////////////////////////