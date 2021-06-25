import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "react-power-tooltip";

import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import { database } from "../services/firebase";

import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user, signOut } = useAuth();

  const { title, questions } = useRoom(roomId);
  const [showTooltip, setShowTooltip] = useState(false);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    history.push("/");
  }

  async function handelDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }

    toast.success("was successfully removed!");
  }

  async function handelCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handelHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <div
              style={{ position: "relative" }}
              onMouseOver={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className="user-info">
                <img src={user?.avatar} alt={user?.name} />
              </div>

              <Tooltip show={showTooltip} hoverColor="white" hoverBackground="#835afd">
                <span onClick={handleEndRoom}>Fechar Sala</span>
                <span onClick={signOut}>Logout</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div>
          <Toaster />
        </div>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handelCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handelHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => handelDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
