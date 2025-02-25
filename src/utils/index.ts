type Source = [number, number][];

export function countDouble(source: Source): number {
  let count = 0;
  source.forEach((inner) => {
    if (inner[0] === inner[1]) count++;
  });
  return count;
}

export function sortAsc(source: Source): Source {
  const sums = source.map((item) => ({
    sum: sum(item),
    first: item[0],
    second: item[1],
  }));

  sums.sort((a, b) => {
    if (a.sum !== b.sum) return a.sum - b.sum;
    if (a.first !== b.first) return a.first - b.first;
    if (a.second !== b.second) return a.second - b.second;
    return 0;
  });

  return sums.map((item) => [item.first, item.second]);
}

export function sortDesc(source: Source): Source {
  return sortAsc(source).reverse();
}

export function removeDup(source: Source): Source {
  const chunk: Record<number, number[]> = {};
  source.forEach((item, idx) => {
    const key = sum(item);
    if (!chunk[key]) {
      chunk[key] = [idx];
      return;
    }
    chunk[key].push(idx);
  });

  let listremoved: number[] = [];
  for (const key in chunk) {
    if (chunk[key].length > 1) {
      listremoved = [...listremoved, ...chunk[key]];
    }
  }

  return source.filter((_, idx) => !listremoved.includes(idx));
}

export function flip(source: Source): Source {
  return source.map((item) => [...item].reverse()) as Source;
}

export function removeWhenSumIs(target: number, source: Source): Source {
  const listremoved = source
    .map((item, idx) => (sum(item) === target ? idx : null))
    .filter((item) => item !== null);

  if (listremoved.length <= 0)
    throw new Error(`No value with sum '${target}' to be removed`);

  return source.filter((_, idx) => !listremoved.includes(idx));
}

export function validateNewSource(newsource: string): Source {
  const input = JSON.parse(newsource);

  if (!Array.isArray(input)) throw new Error("Invalid source was provided");
  if (input.length <= 0) throw new Error("Invalid source was provided");
  input.forEach((inner) => {
    if (!Array.isArray(inner)) throw new Error("Invalid source was provided");
    if (inner.length !== 2) throw new Error("Invalid source was provided");
    if (!Number(inner[0]) && !Number(inner[0]))
      throw new Error("Invalid source was provided");
  });

  // valid path
  return input as Source;
}

export function generateRandom(length: number = 10): Source {
  const gen: Source = [];
  for (let i = 0; i < length; i++) {
    const item: [number, number] = [0, 0];
    item[0] = randnum();
    item[1] = randnum();
    gen.push(item);
  }
  return gen;
}

/* ---------------------------------------------------------------- */
/*                              helper                              */
/* ---------------------------------------------------------------- */
function sum(item: [number, number]): number {
  return item[0] + item[1];
}

function randnum(max: number = 10): number {
  return Math.floor(Math.random() * max) + 1;
}
