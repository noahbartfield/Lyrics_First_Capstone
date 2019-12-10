﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Routes.V1
{
    public static class Api
    {
        internal const string Root = "api";
        internal const string Version = "v1";
        internal const string Base = Root + "/" + Version;

        public static class Values
        {
            public const string GetAll = Base + "/Values";
            public const string Get = Base + "/Values/{id}";
        }
        public static class Songs
        {
            public const string GetSongs = Base + "/Songs";
            public const string GetSong = Base + "/Songs/{id}";
        }
        public static class Words
        {
            public const string GetWords = Base + "/Words";
            public const string GetWord = Base + "/Words/{id}";
        }
        public static class Titles
        {
            public const string GetTitles = Base + "/Titles";
            public const string GetTitle = Base + "/Titles/{id}";
        }

        public static class User
        {
            public const string Login = Base + "/Auth/Login";
            public const string Register = Base + "/Auth/Register";
            public const string Refresh = Base + "/Auth/Refresh";
        }
    }
}
