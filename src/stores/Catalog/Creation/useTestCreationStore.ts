import { create } from "zustand";
import type { ITestData } from "../../../types";

interface ITestCreationStore {
    testTemplate: ITestData;
    setTestTemplate: (data: ITestData) => void;
    currentQuestion: number;
    setCurrentQuestion: (number: number) => void;

    resetTestTemplate: () => void;
    addQuestion: () => void;
    removeQuestion: () => void;
    setTestInfo: (name: string, value: string) => void;
    setAnswerInfo: (
        questionIndex: number,
        answerIndex: number,
        name: string,
        value: string | boolean
    ) => void;
    setQuestionInfo: (
        questionIndex: number,
        name: string,
        value: string | boolean
    ) => void;
    addAnswer: () => void;
    removeAnswer: () => void;
}

const initialTemplate: ITestData = {
    title: "",
    level: "",
    elo: 100,
    description: "",
    image: "",
    questions: [
        {
            question: "",
            task: "",
            isCode: false,
            answers: [
                {
                    answer: "",
                    is_correct: true,
                },
                {
                    answer: "",
                    is_correct: false,
                },
            ],
        },
    ],
};

const testCreationStore = create<ITestCreationStore>((set, get) => ({
    testTemplate: initialTemplate,
    currentQuestion: 0,
    resetTestTemplate: () => {
        set({
            testTemplate: initialTemplate,
        });
    },
    setTestTemplate: (data: ITestData) => {
        set({ testTemplate: data });
    },
    setCurrentQuestion: (number: number) => {
        set({ currentQuestion: number });
    },
    addQuestion: () => {
        set({
            testTemplate: {
                ...get().testTemplate,
                questions: [
                    ...get().testTemplate.questions,
                    {
                        question: "",
                        task: "",
                        isCode: false,
                        answers: [
                            {
                                answer: "",
                                is_correct: true,
                            },
                        ],
                    },
                ],
            },
        });
    },
    removeQuestion: () => {
        if (get().testTemplate.questions.length === 1) return;

        set({
            testTemplate: {
                ...get().testTemplate,
                questions: get().testTemplate.questions.slice(
                    0,
                    get().testTemplate.questions.length - 1
                ),
            },
        });
    },
    setTestInfo: (name: string, value: string) => {
        set({
            testTemplate: {
                ...get().testTemplate,
                [name]: value,
            },
        });
    },
    setAnswerInfo: (
        questionIndex: number,
        answerIndex: number,
        name: string,
        value: string | boolean
    ) => {
        set({
            testTemplate: {
                ...get().testTemplate,
                questions: get().testTemplate.questions.map((question, index) =>
                    index === questionIndex
                        ? {
                              ...question,
                              answers: question.answers.map((answer, index) =>
                                  index === answerIndex
                                      ? { ...answer, [name]: value }
                                      : answer
                              ),
                          }
                        : question
                ),
            },
        });
    },
    setQuestionInfo: (
        questionIndex: number,
        name: string,
        value: string | boolean
    ) => {
        set({
            testTemplate: {
                ...get().testTemplate,
                questions: get().testTemplate.questions.map((question, index) =>
                    index === questionIndex
                        ? { ...question, [name]: value }
                        : question
                ),
            },
        });
    },
    addAnswer: () => {
        set({
            testTemplate: {
                ...get().testTemplate,
                questions: get().testTemplate.questions.map((question, index) =>
                    index === get().currentQuestion
                        ? {
                              ...question,
                              answers: [
                                  ...question.answers,
                                  {
                                      answer: "",
                                      is_correct: false,
                                  },
                              ],
                          }
                        : question
                ),
            },
        });
    },
    removeAnswer: () => {
        if (
            get().testTemplate.questions[get().currentQuestion].answers
                .length === 1
        )
            return;
        set({
            testTemplate: {
                ...get().testTemplate,
                questions: get().testTemplate.questions.map((question, index) =>
                    index === get().currentQuestion
                        ? {
                              ...question,
                              answers: question.answers.slice(
                                  0,
                                  question.answers.length - 1
                              ),
                          }
                        : question
                ),
            },
        });
    },
}));

export const getTestTemplate = () =>
    testCreationStore((s: ITestCreationStore) => s.testTemplate);
export const getCurrentQuestion = () =>
    testCreationStore((s: ITestCreationStore) => s.currentQuestion);
export const setCurrentQuestion = (number: number) =>
    testCreationStore.getState().setCurrentQuestion(number);

export const addQuestion = () => testCreationStore.getState().addQuestion();
export const removeQuestion = () =>
    testCreationStore.getState().removeQuestion();
export const setTestInfo = (name: string, value: string) =>
    testCreationStore.getState().setTestInfo(name, value);
export const setAnswerInfo = (
    questionIndex: number,
    answerIndex: number,
    name: string,
    value: string | boolean
) =>
    testCreationStore
        .getState()
        .setAnswerInfo(questionIndex, answerIndex, name, value);
export const setQuestionInfo = (
    questionIndex: number,
    name: string,
    value: string | boolean
) => testCreationStore.getState().setQuestionInfo(questionIndex, name, value);
export const setTestTemplate = (data: ITestData) =>
    testCreationStore.getState().setTestTemplate(data);
export const addAnswer = () => testCreationStore.getState().addAnswer();
export const removeAnswer = () => testCreationStore.getState().removeAnswer();
export const resetTestTemplate = () =>
    testCreationStore.getState().resetTestTemplate();
