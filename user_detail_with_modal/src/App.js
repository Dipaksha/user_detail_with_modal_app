import UserSectionLayout from "./components/UserSectionLayout";
import { Container } from "@material-ui/core";
function App() {
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: "center" }}>User Details</h1>
      <UserSectionLayout />
    </Container>
  );
}

export default App;
