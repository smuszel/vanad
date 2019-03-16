import fib from '../src/fib';
import test from 'ava';

test('0 -> 0', t => t.is(fib(0), 0));
test('1 -> 1', t => t.is(fib(1), 1));
test('2 -> 1', t => t.is(fib(2), 1));
test('3 -> 2', t => t.is(fib(3), 2));
test('4 -> 3', t => t.is(fib(4), 3));
test('5 -> 5', t => t.is(fib(5), 5));
test('7 -> 13', t => t.is(fib(7), 13));
test('13 -> 233', t => t.is(fib(13), 233));