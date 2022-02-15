const user_model = require("../models/user");
const feeds_model = require("../models/feeds");

async function init() {
  const users_count = await user_model.countDocuments();
  if (users_count <= 0) {
    const users = [
      {
        email: "testemail1@gmail.com",
        password: "somerandomstring",
        name: "username",
        contactNo: "12345678",
        date_of_birth: "19-04-1999",
        time_of_birth: "18:09 PM",
        imageUrl: "/images/users/1.png",
        gender: "male",
        marital_status: "married",
      },
      {
        email: "testemail2@gmail.com",
        password: "somerandomstring",
        name: "username2",
        contactNo: "12345678",
        date_of_birth: "19-04-1999",
        time_of_birth: "18:09 PM",
        imageUrl: "/images/users/2.png",
        gender: "male",
        marital_status: "married",
      },
      {
        email: "testemail3@gmail.com",
        password: "somerandomstring",
        name: "username3",
        contactNo: "12345678",
        date_of_birth: "19-04-1999",
        time_of_birth: "18:09 PM",
        imageUrl: "/images/users/1.png",
        gender: "male",
        marital_status: "married",
      },
      {
        email: "testemail4@gmail.com",
        password: "somerandomstring",
        name: "username4",
        contactNo: "12345678",
        date_of_birth: "19-04-1999",
        time_of_birth: "18:09 PM",
        imageUrl: "/images/users/1.png",
        gender: "male",
        marital_status: "married",
      },
    ];

    await user_model.create(users);
    console.log("users inserted");
  } else {
    console.log("users already exists");
  }

  const feeds_count = await feeds_model.countDocuments();
  if (feeds_count <= 0) {
    const feeds = [
      {
        title: "feed_title_1",
        author: "Steve Jobs",
        tech: "IT",
        image: "/images/feeds/1.png",
      },
      {
        title: "feed_title_2",
        author: "Matt",
        tech: "IT",
        image: "/images/feeds/2.png",
      },
      {
        title: "feed_title_3",
        author: "Alvin Toffler",
        tech: "IT",
        image: "/images/feeds/3.png",
      },
    ];

    await feeds_model.create(feeds);
    console.log("feeds inserted");
  } else {
    console.log("feeds already exists");
  }
}

init();
