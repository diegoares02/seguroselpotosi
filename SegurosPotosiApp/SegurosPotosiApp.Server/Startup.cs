using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiApp.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IUser, User>();
            services.AddSingleton<IBook, Book>();
            services.AddSingleton<IAuthor, Author>();

            services.AddDbContext<SegurosPotosiContext>(options => options.UseInMemoryDatabase("SegurosPotosi"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "segurospotosi123456Test",
                        ValidAudience = "segurospotosi123456Test",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("segurospotosi123456Test")),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<SegurosPotosiContext>();
                DataSeed.Seed(context);
            }
        }
    }
}
