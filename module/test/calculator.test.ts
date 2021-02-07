import Calculator from  '../src/calculator';

test('adds 2 + 4 to equal 6', () => {
  const sum: number = Calculator.sumTwoValues(2,4);
  expect(sum).toBe(6);
});