﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class CowriterSongRel
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int SongId { get; set; }
        public Song Song { get; set; }
        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
