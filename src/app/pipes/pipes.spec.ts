import { AbbreviateNumberPipe } from './abbreviate-number.pipe';
import { NumberToRomanPipe } from './number-to-roman.pipe';
import { UnknownToQuestionMarkPipe } from './unknow-to-question-mark.pipe';

describe('AbbreviateNumberPipe', () => {
  const abbreviateNumberPipe = new AbbreviateNumberPipe();
  const numberToRomanPipe = new NumberToRomanPipe();
  const unknownToQuestionMarkPipe = new UnknownToQuestionMarkPipe();

  it('should abbreviate numbers', () => {
    expect(abbreviateNumberPipe.transform(200000)).toBe(
      '200 mil',
      'abbreviateNumberPipe transforms mil fail'
    );
    expect(abbreviateNumberPipe.transform(300000000)).toBe(
      '300 mi',
      'abbreviateNumberPipe transforms  mi fail'
    );
    expect(abbreviateNumberPipe.transform(4500000000)).toBe(
      '4.5 bi',
      'abbreviateNumberPipe transforms bi fail'
    );
  });

  it('should transforms "unknown" in to "?"', () => {
    expect(unknownToQuestionMarkPipe.transform('unknown')).toBe(
      '?',
      'unknownToQuestionmarkPipe transforms fail'
    );
  });

  it('should transforms number into to roman numerals', () => {
    expect(numberToRomanPipe.transform(1)).toBe(
      'i',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(2)).toBe(
      'ii',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(3)).toBe(
      'iii',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(4)).toBe(
      'iv',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(5)).toBe(
      'v',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(6)).toBe(
      'vi',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(7)).toBe(
      'vii',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(8)).toBe(
      'viii',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(9)).toBe(
      'ix',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(10)).toBe(
      'x',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(20)).toBe(
      'xx',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(30)).toBe(
      'xxx',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(40)).toBe(
      'xl',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(50)).toBe(
      'l',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(60)).toBe(
      'lx',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(70)).toBe(
      'lxx',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(80)).toBe(
      'lxxx',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(90)).toBe(
      'xc',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(100)).toBe(
      'c',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(200)).toBe(
      'cc',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(300)).toBe(
      'ccc',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(400)).toBe(
      'cd',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(500)).toBe(
      'd',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(600)).toBe(
      'dc',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(700)).toBe(
      'dcc',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(800)).toBe(
      'dccc',
      'unknownToQuestionmarkPipe transforms fail'
    );
    expect(numberToRomanPipe.transform(900)).toBe(
      'cm',
      'unknownToQuestionmarkPipe transforms fail'
    );
  });
});
