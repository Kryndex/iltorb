'use strict';

const brotli = require('../');
const expect = require('expect.js');
const fs = require('fs');

function testBufferSync(method, bufferFile, resultFile, params) {
  params = params || {};
  const buffer = fs.readFileSync(`${__dirname}/fixtures/${bufferFile}`);
  const result = fs.readFileSync(`${__dirname}/fixtures/${resultFile}`);
  const output = method(buffer, params);
  expect(output).to.eql(result);
}

describe('Brotli Buffer Sync', function() {
  describe('compress', function() {
    it('should compress binary data', function() {
      testBufferSync(brotli.compressSync, 'data10k.bin', 'data10k.bin.compressed');
    });

    it('should compress text data', function() {
      testBufferSync(brotli.compressSync, 'data.txt', 'data.txt.compressed');
    });

    it('should compress text data with quality=3', function() {
      testBufferSync(brotli.compressSync, 'data.txt', 'data.txt.compressed.03', { quality: 3 });
    });

    it('should compress text data with quality=9', function() {
      testBufferSync(brotli.compressSync, 'data.txt', 'data.txt.compressed.09', { quality: 9 });
    });

    it('should compress an empty buffer', function() {
      testBufferSync(brotli.compressSync, 'empty', 'empty.compressed');
    });
  });

  describe('decompress', function() {
    it('should decompress binary data', function() {
      testBufferSync(brotli.decompressSync, 'data10k.bin.compressed', 'data10k.bin');
    });

    it('should decompress text data', function() {
      testBufferSync(brotli.decompressSync, 'data.txt.compressed', 'data.txt');
    });

    it('should decompress to an empty buffer', function() {
      testBufferSync(brotli.decompressSync, 'empty.compressed', 'empty');
    });
  });
});