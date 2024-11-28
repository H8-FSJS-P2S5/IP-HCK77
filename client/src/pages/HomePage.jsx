import { Button, Card, Textarea, Label } from "flowbite-react";

export default function HomePage() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col max-h-screen h-screen justify-center items-center">
      <h1 className="font-bold underline">Hello world!</h1>
      <Card>
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <h3>You have not request a potion (synopsis)</h3>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="synopsis" value="synopsis" />
            </div>
            <Textarea placeholder="Create your initial synopsis..." />
          </div>
          <div className="flex justify-center mt-2">
            <Button type="submit">Request Potion</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
