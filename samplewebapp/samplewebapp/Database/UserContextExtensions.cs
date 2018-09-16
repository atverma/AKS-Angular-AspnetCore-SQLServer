using System.Linq;

public static class UserContextExtensions
{
    public static void EnsureSeedData(this UserContext context)
    {
        SeedUsers(context);
        context.SaveChanges();
    }

    private static void SeedUsers(UserContext context)
    {
        if (!context.Users.Any())
        {
            context.Users.AddRange(
                new User {UserName = "John Doe" },
                new User {UserName = "Kevin Doe" },
                new User {UserName = "Michael Doe" },
                new User {UserName = "Millar Doe" }
            );
        }
    }
}