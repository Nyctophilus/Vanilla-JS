new hoverEffect({
  parent: document.querySelector(".distortion"),
  intensity: 0.1,
  image1:
    "https://images.pexels.com/photos/11116484/pexels-photo-11116484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  image2:
    "https://images.pexels.com/photos/10071765/pexels-photo-10071765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  displacementImage: "./fluid.jpg",

  speedIn: 2,
  speedOut: 5,
  //   angle: Math.PI / 8,
});
