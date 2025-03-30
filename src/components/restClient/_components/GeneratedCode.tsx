import RequestSection from "./RequestSection";

const GeneratedCode = () => {
  return (
    <RequestSection title="Generated request code:" buttonText="Generate">
      <pre className="whitespace-pre-wrap">
        <code>
          {`
            fetch("https://api.example.com/data", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ name: "Alice" })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));
          `}
        </code>
      </pre>
    </RequestSection>
  );
};

export default GeneratedCode;
  