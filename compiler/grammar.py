import pyparsing as pp


# Basic grammar elements
comment = pp.Literal(";;") + pp.SkipTo(pp.LineEnd())
lp = pp.Suppress("(")
rp = pp.Suppress(")")

quoted_string = pp.QuotedString('"')

date_half = pp.Word(pp.nums)
date_format = date_half + pp.Suppress("-") + date_half
date_none = pp.Literal("-").setParseAction(pp.replaceWith("Current"))
date = date_format | date_none

parens = lambda inner: pp.Dict(pp.Group(lp + inner + rp))

# Expression grammar
expr = lambda key, value: parens(pp.Literal(key) + value)

expr_date = lambda key: expr(key, date)
date_end = expr_date("end")
date_start = expr_date("start")

expr_quoted = lambda key: expr(key, quoted_string)
category = expr_quoted("category")
company = expr_quoted("company")
degree = expr_quoted("degree")
email = expr_quoted("email")
github = expr_quoted("github")
linkedin = expr_quoted("linkedin")
location = expr_quoted("location")
name = expr_quoted("name")
phone = expr_quoted("phone")
portfolio = expr_quoted("portfolio")
role = expr_quoted("role")

expr_list = lambda key: expr(key, pp.OneOrMore(quoted_string))
bullets = expr_list("bullets")
items = expr_list("items")


# Resume section grammar
entry = lambda params_list: lp + pp.Suppress("entry") + pp.Dict(pp.Each(params_list)) + rp
expr_list_of_entry = lambda name, params_list: expr(name, pp.OneOrMore(pp.Group(entry(params_list))))

info_links = expr("links", pp.OneOrMore(linkedin | github | portfolio))
info = expr("info", pp.Each((name, email, phone, location, info_links)))

education_gpa = expr("gpa", pp.Word(pp.nums + "." + pp.nums))
education = expr_list_of_entry("education", (name, degree, location, date_start, date_end, education_gpa))

skills = expr_list_of_entry("skills", (category, items))

work = expr_list_of_entry("work", (company, role, location, date_start, date_end, bullets))

projects = expr_list_of_entry("projects", (name, date_start, date_end, bullets))

# High-level structure
sections_params = (education | skills | work | projects)
sections = info + pp.OneOrMore(sections_params)
resume = pp.Dict((lp + pp.Suppress("resume") + sections + rp).ignore(comment))

