import { parseTarget } from '../../src/config/target';
import { DATE } from '../../src/domain/model/weather-forecast-model';

describe('parseTarget', () => {
  it('T6 should convert today to DATE.TODAY', () => {
    // Given / When / Then
    expect(parseTarget('today')).toBe(DATE.TODAY);
  });

  it('T7 should convert tomorrow to DATE.TOMORROW', () => {
    expect(parseTarget('tomorrow')).toBe(DATE.TOMORROW);
  });

  it('T8 should throw when arg is unexpected', () => {
    expect(() => parseTarget('yesterday')).toThrow(new Error('invalid target: yesterday'));
  });

  it('T9 should throw when arg is undefined', () => {
    expect(() => parseTarget(undefined)).toThrow(new Error('invalid target: undefined'));
  });

  it('T10 should throw when arg is upper case', () => {
    expect(() => parseTarget('TODAY')).toThrow(new Error('invalid target: TODAY'));
  });

  // P1: 例外を投げない限り返り値は DATE のいずれか
  it.each(['today', 'tomorrow', 'TODAY', '', 'yesterday', undefined, ' today'])(
    'P1 should return a DATE value unless it throws: %p',
    (arg) => {
      // Given / When
      let result;
      try {
        result = parseTarget(arg);
      } catch {
        return;
      }
      // Then
      expect(Object.values(DATE)).toContain(result);
    }
  );
});
