const amqplib = require("amqplib");
const amqp_urlJ_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "amqp://localhost:5672";
const receiveQueue = async () => {
  try {
    const conn = await amqplib.connect(amqp_url_docker);
    const channel = await conn.createChannel();
    const nameQueue = "q3";
    await channel.assertQueue(nameQueue, {
      // durable: false, //mất hàng đợi khi cloud bị crash
      durable: true,
    });
    channel.consume(
      nameQueue,
      (msg) => {
        console.log(`Msg:::::`, msg.content.toString());
      },
      {
        // noAck: false, //nhận nhưng không xác nhận, gọi lại sẽ nhận lại
        noAck: true, //nhận và ký xác nhận
      }
    );
    //   channel.close()
  } catch (error) {
    console.error(error);
  }
};
receiveQueue();
