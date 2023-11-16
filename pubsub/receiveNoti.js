const amqplib = require("amqplib");
const amqp_urlJ_cloud =
  "amqps://vtqfufsk:mc_1kCAAa0gsCR9qysjQKnRKIzcD3gV3@armadillo.rmq.cloudamqp.com/vtqfufsk";
const amqp_url_docker = "amqp://localhost:5672";
const receiceNoti = async () => {
  try {
    const conn = await amqplib.connect(amqp_urlJ_cloud);
    const channel = await conn.createChannel();
    const nameExchange = "video";
    await channel.assertExchange(
      nameExchange,
      "fanout", // ai muốn nhận thì nhận thoải mái miễn có đk
      {
        durable: false,
      }
    );
    const {
      queue, // name queue
    } = await channel.assertQueue("", {
      //'': queue tự động sinh ra, k đặt tên
      exclusive: true, //nếu không sub nữa, tự xoá queue
    });
    console.log(`nameQueue::: ${queue}`);
    await channel.bindQueue(queue, nameExchange, ""); //bingding: nằm giữa exchange và queue
    //exchange nằm giữa producer và queue
    //producer-exchange-binding-queue
    await channel.consume(
      queue,
      (msg) => {
        console.log(`msg:: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {}
};
receiceNoti();
