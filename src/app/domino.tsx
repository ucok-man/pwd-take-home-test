/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  countDouble,
  flip,
  generateRandom,
  removeDup,
  removeWhenSumIs,
  sortAsc,
  sortDesc,
  validateNewSource,
} from "@/utils";
import { ReactNode, useState } from "react";

const initial: [number, number][] = [
  [1, 2],
  [1, 2],
  [2, 1],
  [1, 3],
];

export default function Domino() {
  const [source, setSource] = useState([...initial]);
  const [sourcePlaceholder, setSourcePlaceholder] = useState([...initial]);

  const [deleteTarget, setDeleteTarget] = useState("");
  const [erroMsg, setErrorMsg] = useState<string | null>(null);

  const [newSource, setNewSource] = useState("");

  const onRemoveWithTarget = () => {
    if (deleteTarget === "") {
      setErrorMsg("There is nothing to removed");
      return;
    }
    if (!Number(deleteTarget)) {
      setErrorMsg(
        `Cannot use ${deleteTarget} as a target. Invalid number or index`
      );
      return;
    }

    try {
      setSource(removeWhenSumIs(Number(deleteTarget), source));
      setDeleteTarget("");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  const onSubmitNewSource = () => {
    if (newSource === "") {
      alert(`There is nothing to submitted as new source.`);
      return;
    }
    try {
      const sanitized = validateNewSource(newSource);
      setSource(sanitized);
      setSourcePlaceholder(sanitized);
      setNewSource("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-4">
      <div className="flex justify-between w-full border-b-2 pb-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold">Dominoes</h1>
        </div>
      </div>
      <div className="border shadow-lg rounded-lg text-gray-600 space-y-2 p-8">
        <div className="pb-4 border-b-2 mb-4">
          <Header title="Source" value={JSON.stringify(sourcePlaceholder)} />
          <Header
            title="Double Number"
            value={countDouble(source).toString()}
          />
        </div>

        <div className="flex gap-4 py-4 pb-8 flex-wrap items-center justify-center">
          {source.map((items, idx) => (
            <DominoCard key={idx} items={items} />
          ))}
        </div>

        <div className="pt-4 border-t-2">
          <div className="flex w-full items-center gap-4 flex-wrap justify-center">
            <Button onClick={() => setSource(sortAsc(source))}>
              Sort (Asc)
            </Button>
            <Button onClick={() => setSource(sortDesc(source))}>
              Sort (Desc)
            </Button>
            <Button onClick={() => setSource(removeDup(source))}>
              Remove Dup
            </Button>
            <Button onClick={() => setSource(flip(source))}>Flip</Button>
            <Button onClick={() => setSource([...sourcePlaceholder])}>
              Reset
            </Button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onRemoveWithTarget();
              }}
              className="w-[150px] flex flex-row-reverse items-center justify-center gap-2"
            >
              <input
                type="text"
                placeholder="??"
                className="border w-12 rounded-md h-9 shadow-md text-center appearance-none focus-visible:outline-none text-gray-500 px-2"
                value={deleteTarget}
                onChange={(e) => {
                  if (erroMsg) setErrorMsg("");
                  setDeleteTarget(e.target.value);
                }}
              />
              <button
                type="submit"
                className="text-sm font-medium px-4 py-2 w-full border shadow-md rounded-md hover:bg-stone-50 transition-all duration-300 active:translate-y-0.5 text-gray-500"
              >
                Remove
              </button>
            </form>
          </div>
        </div>

        {erroMsg && (
          <div className="py-2">
            <p className="text-red-500 text-xs text-center">{erroMsg}</p>
          </div>
        )}
      </div>

      <div className="my-8 w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitNewSource();
          }}
          className="flex flex-col sm:flex-row items-center w-full gap-4 text-gray-600"
        >
          <Button type="submit">Submit</Button>

          <input
            type="text"
            placeholder="Set new source ex: [[1,2],[1,2],[2,1],[1,3]]"
            className="border w-full rounded-md h-10 shadow-md text-center appearance-none focus-visible:outline-none text-gray-500 px-2"
            value={newSource}
            onChange={(e) => {
              setNewSource(e.target.value);
            }}
          />
          <Button
            type="button"
            onClick={() => setNewSource(JSON.stringify(generateRandom()))}
          >
            Random
          </Button>
        </form>
      </div>
    </div>
  );
}

type DominoCardProp = {
  items: [number, number];
};

function DominoCard({ items }: DominoCardProp) {
  return (
    <div className="h-20 w-10 border shadow-md rounded-sm">
      <div className="p-2 flex flex-col items-center justify-center size-full">
        <div>{items[0]}</div>
        <div className="border w-full my-2" />
        <div>{items[1]}</div>
      </div>
    </div>
  );
}

type ButtonProp = {
  children: ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
};

function Button({ children, onClick, type = "button" }: ButtonProp) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="text-sm font-medium px-4 py-2 w-[150px] border shadow-md rounded-md hover:bg-stone-50 transition-all duration-300 active:translate-y-0.5 text-gray-500"
    >
      {children}
    </button>
  );
}

type HeaderProp = { title: string; value: string };

function Header({ title, value }: HeaderProp) {
  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 mb-6 sm:gap-4 ">
      <h2 className="font-medium w-full text-center sm:w-36 sm:text-start">
        {title}
      </h2>
      <span className="max-sm:hidden">:</span>
      <div className="max-sm:w-full max-sm:text-center">{value}</div>
    </div>
  );
}
