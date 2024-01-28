import { describe, expect, test } from 'vitest';
import celsiusToFarenheit from '~/utils/CelsiusToFarenheit';
import farenheitToCelsius from '~/utils/FarenheitToCelsius';
import formatDtToDate from '~/utils/FormatDtToDate';
import FormatDtToHour from '~/utils/FormatDtToHour';
import FormatTemperature from '~/utils/FormatTemperature';
import GetCurrentTempName from '~/utils/GetCurrentTempName';
import latinize from '~/utils/Latinize';
import TransformUnitToChar from '~/utils/TransformUnitToChar';

describe('Utils - General conversions', () => {
  test('converts celsius to farenheit', () => {
    expect(celsiusToFarenheit(30)).toBe(86);
  });

  test('converts farenheit to celsius', () => {
    expect(farenheitToCelsius(86)).toBe(30);
  });

  test('checks if temperature is NaN, if not uses Math.round then converts to string', () => {
    expect(FormatTemperature('wrong value')).toEqual('N/A');
    expect(FormatTemperature('86.4')).toBe('86');
    expect(FormatTemperature(35)).toBe('35');
  });

  test('convert current unit name to temperature name', () => {
    expect(GetCurrentTempName('imperial')).toEqual('Farenheit');
    expect(GetCurrentTempName('metric')).toEqual('Celsius');
    expect(GetCurrentTempName('standard')).toEqual('Celsius');
  });

  test('convert current unit name to temperature name', () => {
    expect(GetCurrentTempName('imperial')).toEqual('Farenheit');
    expect(GetCurrentTempName('metric')).toEqual('Celsius');
    expect(GetCurrentTempName('standard')).toEqual('Celsius');
  });

  test('convert current unit name to temperature indicator (C/F)', () => {
    expect(TransformUnitToChar('metric')).toEqual('C');
    expect(TransformUnitToChar('imperial')).toEqual('F');
    expect(TransformUnitToChar('standard')).toEqual('F');
  });
});

describe('latinize', () => {
  test('should convert accented characters to their Latin equivalents', () => {
    const input = 'ÁÄÆÇÉËÍÎÑÓÖŒÚÜÝ';
    const expected = 'AAAECEEIINOOOEUUY';
    const result = latinize(input);
    expect(result).toEqual(expected);
  });

  test('should handle a mix of accented and non-accented characters', () => {
    const input = 'Héllø Wørld!';
    const expected = 'Hello World!';
    const result = latinize(input);
    expect(result).toEqual(expected);
  });

  test('should preserve non-accented characters', () => {
    const input = 'This is a test 123!';
    const result = latinize(input);
    expect(result).toEqual(input);
  });

  test('should handle an empty string', () => {
    const input = '';
    const result = latinize(input);
    expect(result).toEqual('');
  });

  test('should handle undefined input', () => {
    const result = latinize(undefined as unknown as string);
    expect(result).toBeUndefined();
  });

  test('should use custom character map if provided', () => {
    const input = 'ÁÄÆÇÉËÍÎÑÓÖŒÚÜÝ';
    const customCharacters = { Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ý: 'Y' };
    const expected = 'AÄÆÇEËIÎÑOÖŒUÜY'; // Custom map retains certain accented characters
    const result = latinize(input, customCharacters);
    expect(result).toEqual(expected);
  });
});

describe('formatDtToDate', () => {
  test('should format date to "DD Mon" format', () => {
    const result = formatDtToDate(1643468400);
    expect(result).toBe('Jan 29');
  });

  test('should handle undefined input', () => {
    const result = formatDtToDate(undefined as unknown as number);
    expect(result).toBeUndefined();
  });
});

describe('FormatDtToHour', () => {
  test('should format date to "DD Mon HH:mm" format', () => {
    const result = FormatDtToHour(1643468400);
    expect(result).toBe('Jan 29, 12:00 PM');
  });

  test('should handle undefined input', () => {
    const result = FormatDtToHour(undefined as unknown as number);
    expect(result).toBeUndefined();
  });
});
