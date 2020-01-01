using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Capstone.Data;
using Capstone.Models.Data;
using Capstone.Routes.V1;
using Microsoft.AspNetCore.Authorization;
using Capstone.Models.ViewModels;

namespace Capstone.Controllers.V1
{
    [Authorize]
    [ApiController]
    public class CowriterSongRelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CowriterSongRelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet(Api.Cowriter.GetCowriters)]
        public async Task<ActionResult<IEnumerable<CowriterNameViewModel>>> GetCowriters(int id)
        {
            List<CowriterSongRel> cowriters = await _context.CowriterSongRels.Include(cs => cs.User).Where(cs => cs.SongId == id).ToListAsync();
            List<CowriterNameViewModel> cowriterVMs = new List<CowriterNameViewModel>();
            foreach (CowriterSongRel cs in cowriters)
            {
                CowriterNameViewModel cowriter = new CowriterNameViewModel()
                {                   
                    SongId = cs.SongId,
                    UserId = cs.UserId,
                    UserName = cs.User.UserName
                };
                cowriterVMs.Add(cowriter);
            }

            return cowriterVMs;
        }

        [HttpPost(Api.Cowriter.PostCowriter)]
        public async Task<ActionResult<CowriterSongRel>> PostCowriter(CowriterSongRel cowriterSongRel)
        {
            _context.CowriterSongRels.Add(cowriterSongRel);
            await _context.SaveChangesAsync();

            return Ok(cowriterSongRel);

        }

        // DELETE: api/Songs/5
        [HttpDelete(Api.Cowriter.DeleteCowriter)]
        public async Task<ActionResult<CowriterSongRel>> DeleteCowriter(int id)
        {
            var cowriterSongRel = await _context.CowriterSongRels.FindAsync(id);
            if (cowriterSongRel == null)
            {
                return NotFound();
            }

            _context.CowriterSongRels.Remove(cowriterSongRel);
            await _context.SaveChangesAsync();

            return cowriterSongRel;
        }
    }
}
