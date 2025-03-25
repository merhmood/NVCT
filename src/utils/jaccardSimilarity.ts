function jaccardSimilarity(arr1: string[], arr2: string[]): number {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size; // Value between 0 and 1
}

export default jaccardSimilarity;
