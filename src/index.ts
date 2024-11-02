import server from "./server";

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
