# Generated by Django 4.2.1 on 2023-05-11 14:55

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("almacen", "0004_alter_variacion_options"),
        ("carts", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="cartitem",
            name="variations",
            field=models.ManyToManyField(blank=True, to="almacen.variacion"),
        ),
    ]