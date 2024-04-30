import React from "react";

import { Button } from "../components/ui/button";
import { SearchInput } from "../components/search-input";
import { PageHeading } from "../components/page-heading";
import { SearchResults } from "../components/search-results";
import { QuizCard } from "../components/quiz-card";
import { toast } from "sonner";
import { useAuth } from "../contexts/auth-provider";
import { useNavigate } from "react-router-dom";

export function Quizzes() {
  const [quizzesQuery, setQuizzesQuery] = React.useState("");
  const navigate = useNavigate();

  const { me } = useAuth();

  // Some test article data just to demonstrate how the cards should look like
  const testQuizzes = [
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
      completed: true,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
      completed: true,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
    },
    {
      images: ["/article-title.jpg"],
      name: "Lions Quiz",
      summary: "Test your knowledge on lions",
      points: 10,
      completed: true,
    },
  ];

  React.useEffect(() => {
    const checkIfUserIsMember = async () => {
      try {
        const user = await me();

        if (user.type === "free") {
          toast.warning("You need to be a member to access quizzes");
          navigate("/membership");
          return;
        }

        return;
      } catch (err) {
        console.log(err);
      }
    };

    checkIfUserIsMember();
  }, []);

  return (
    <div id="quizzes-container" className="min-h-screen flex flex-col p-24">
      <PageHeading title="Quizzes" description="Check out our fun quizzes" />

      <div className="flex items-center gap-x-1 self-center mb-4">
        <SearchInput
          label="Search for quizzes"
          placeholder="Lion quiz"
          description="Search for a quiz that you would like to complete"
          id="quiz-search-input"
          value={quizzesQuery}
          setValue={setQuizzesQuery}
          name="quiz-search-input"
        />
        <Button
          onClick={() =>
            toast.warning("This feature has not yet been made. Sorry :(")
          }
        >
          Search
        </Button>
      </div>

      <h2 className="text-2xl font-bold">Our latest quizzes</h2>
      <SearchResults
        results={testQuizzes.map((quiz, i) => (
          <QuizCard quiz={quiz} quizzes={testQuizzes} i={i} />
        ))}
      />
    </div>
  );
}
