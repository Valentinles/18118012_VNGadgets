using GadgetsVN.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Implementations
{
    public abstract class DataService
    {
        protected readonly GadgetsVNDbContext context;

        public DataService(GadgetsVNDbContext context)
        {
            this.context = context;
        }
    }
}
