import { CheckIcon } from "@radix-ui/react-icons";
import { Coins } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

/**
 * Renders a small summary of a quiz
 * @param {{quiz: any}} props
 * @returns {React.JSX.Element}
 */
export function QuizCard({ quiz }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div
          className="rounded-md bg-primary text-primary-foreground border-2 border-border"
          id="quiz-card"
        >
          <img src={quiz.images[0]} className="rounded-t-md" />
          <div className="p-4 flex flex-col gap-y-4">
            <div>
              <h2 className="text-xl font-bold">{quiz.name}</h2>
              <p>{quiz.summary}</p>
            </div>
            <div className="flex gap-x-1">
              <div className="flex">
                <Coins />
                <p>{quiz.points}</p>
              </div>

              {quiz.completed ? (
                <div className="flex">
                  <CheckIcon height={24} width={24} />
                  <p className="font-bold">This quiz is completed</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You just gained 10 points</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogCancel>Close</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
