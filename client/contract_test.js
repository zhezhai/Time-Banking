const message1 = () => {
  console.log("1");
};

const message2 = () => {
  setTimeout(() => {
    console.log("hello");
  }, 1000);
};

const message3 = () => {
  setTimeout(() => {
    console.log("3");
  }, 2000);
};

const call = () => {
  message1();
  message2();
  message3();
};

call();
