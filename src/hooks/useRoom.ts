import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FireBaseQuestion = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, { authorId: string }>;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };

  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      //! como o Firebase retorna um objeto ao invés de um vetor (padrão do JSON) é necessário converter esse objeto para vetores
      const databaseRoom = room.val();
      const fireBaseQuestion: FireBaseQuestion = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(fireBaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });

    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]);

  return { questions, title };
}
