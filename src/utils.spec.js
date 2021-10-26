import test from 'ava';
import { toCamelCase, bytesToSize } from './utils.js';

test('toCamelCase', async (t) => {
  t.is(toCamelCase('snake-case'), 'snakeCase');
  t.is(toCamelCase('12snake-case'), '12snakeCase');
});

test('bytesToSize', async (t) => {
  t.is(bytesToSize(0), '0 Byte');
  t.is(bytesToSize(512), '512.00 Bytes');
  t.is(bytesToSize(2 * 1024 * 1024), '2.00 MB');
  t.is(bytesToSize(3 * 1024 * 1024 * 1024), '3.00 GB');
  t.is(bytesToSize(4 * 1024 * 1024 * 1024 * 1024), '3.00 TB');
});
