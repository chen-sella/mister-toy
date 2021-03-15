const express = require('express');
const toyService = require('./toy.service');

module.exports = {
  getToys,
  getToyById,
  saveToy,
  removeToy,
};

// Get list Of Toys:
async function getToys(req, res) {
  const filter = JSON.parse(req.query.filterBy);
  console.log('filter', filter);
  try {
    const toys = await toyService.query(filter);
    res.send(toys);
  } catch (err) {
    // logger.error('Cannot get toys', err);
    res.status(500).send({ err: 'Failed to get toys' });
  }
}

// Get a single toy by id
async function getToyById(req, res) {
  try {
    const toyId = req.params.id;
    const toy = await toyService.getById(toyId);
    res.json(toy);
  } catch {
    // logger.error('Cannot get toy', err);
    res.status(500).send({ err: 'Failed to get toy' });
  }
}

// Add a new Toy
async function saveToy(req, res) {
  try {
    const toy = req.body;
    console.log('toy to save backend', toy);
    const savedToy = await toyService.save(toy);
    res.json(savedToy);
  } catch {
    // logger.error('Failed to add toy', err);
    res.status(500).send({ err: 'Failed to add toy' });
  }
}

// remove Toy by id
async function removeToy(req, res) {
  try {
    const toyId = req.params.id;
    await toyService.remove(toyId);
    res.send({ msg: 'Deleted successfully' });
  } catch {
    // logger.error('Failed to add toy', err);
    res.status(500).send({ err: 'Failed to add toy' });
  }
}
