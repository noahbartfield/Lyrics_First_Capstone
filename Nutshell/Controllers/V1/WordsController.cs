﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Capstone.Data;
using Capstone.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Capstone.Routes.V1;
using Microsoft.AspNetCore.Identity;
using Capstone.Helpers;
using Capstone.Models.ViewModels;

namespace Capstone.Controllers.V1
{
    [Authorize]
    [ApiController]
    public class WordsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WordsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Words
        [HttpGet(Api.Words.GetWords)]
        public async Task<ActionResult<IEnumerable<Word>>> GetWords()
        {
            var userId = HttpContext.GetUserId();
            return await _context.Words.Where(w => w.UserId == userId).ToListAsync();
        }

        // GET: api/Words/5
        [HttpGet(Api.Words.GetWord)]
        public async Task<ActionResult<Word>> GetWord(int id)
        {
            var word = await _context.Words.FindAsync(id);

            if (word == null)
            {
                return NotFound();
            }

            return word;
        }
        // PUT: api/Songs/5
        [HttpPut(Api.Words.PutWord)]
        public async Task<IActionResult> PutWord(int id, Word word)
        {
            if (id != word.Id)
            {
                return BadRequest();
            }

            var userId = HttpContext.GetUserId();
            word.UserId = userId;
            _context.Entry(word).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WordExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // POST: api/Songs
        [HttpPost(Api.Words.PostWord)]
        public async Task<ActionResult<Word>> PostWord(WordCreateViewModel wcvm)
        {
            Word newWord = new Word
            {
                Name = wcvm.Name,
                Definition = wcvm.Definition,
                UserId = HttpContext.GetUserId()
            };

            _context.Words.Add(newWord);
            await _context.SaveChangesAsync();

            var foundWord = _context.Words.Where(w => w.UserId == newWord.UserId).OrderByDescending(w => w.Id).Take(1);


            return Ok(foundWord);

        }
        private bool WordExists(int id)
        {
            return _context.Songs.Any(e => e.Id == id);
        }
    }
}